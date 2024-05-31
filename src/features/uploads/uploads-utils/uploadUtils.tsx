

const extractVersion = (file: string): string => {
  const versionMatch = file.match(/(\d+\.\d+\.\d+)/); // Buscar versiones como "1.2.3"
  return versionMatch ? versionMatch[0] : "unknown"; // Retornar la versión o "unknown"
};


const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const formatOSName = (os: string) => {
  return os.toLowerCase() === "macos" ? "MacOs" : capitalizeFirstLetter(os);
};

// This function is used to organize the files in the correct path
export const organizeFiles = (file: any) => {

  const version = extractVersion(file);

  let os = "";
  if (file.includes(".exe") || file.includes(".msi")) {
    os = "windows";
  } else if (file.includes(".dmg")) {
    os = "mac-os";
  } else if (file.includes(".deb") || file.includes(".AppImage")) {
    os = "linux";
  }

  const installer = file.split("/").pop() || "unknown";
  const objectS3Key = `releases/${version}/${os}/${installer}`;

  return { objectS3Key, os, version, installer };
};



interface GroupedFilesByOSAndVersion {
  [os: string]: {
    [version: string]: string[]; // Cada versión contiene una lista de archivos
  };
}

export const classifyByOS = (files: string[]): GroupedFilesByOSAndVersion => {
  const groups: GroupedFilesByOSAndVersion = {};

  files.forEach((file) => {
    const version = extractVersion(file); // Extraer versión
    let os = "";

    if (file.endsWith(".exe") || file.endsWith(".msi")) {
      os = "windows";
    } else if (file.endsWith(".dmg")) {
      os = "macos";
    } else if (file.endsWith(".deb") || file.includes(".AppImage")) {
      os = "linux";
    }

    // Si el grupo para este OS no existe, crearlo
    if (!groups[os]) {
      groups[os] = {};
    }

    // Si el subgrupo para esta versión no existe, crearlo
    if (!groups[os][version]) {
      groups[os][version] = [];
    }

    // Agregar el archivo al grupo correcto
    groups[os][version].push(file);
  });

  return groups;
};


