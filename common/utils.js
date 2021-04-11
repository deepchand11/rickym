export const statusIndicator = (status) => {
  switch (status) {
    case "Alive":
      return "#28a745";
    case "Dead":
      return "#dc3545";
    default:
      return "#E4E4E4";
  }
};

export const keyExtractor = (item) => item.id.toString();
