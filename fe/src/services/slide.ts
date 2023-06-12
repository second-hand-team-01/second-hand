export const getFileNameFromUrl = (url: string) => {
  const fileNameMatch = url.match(/[^/]+\.(jpg|png|svg|jpeg)(\?.*)?$/i);
  if (fileNameMatch) {
    const fileName = fileNameMatch[0];
    const cleanFileName = fileName.split('?')[0];
    return cleanFileName;
  }
  return '';
};
