export default interface FetchedImage {
    id: string;
    urls: {
        small: string;
        regular: string;
      };
      alt_description: string | undefined;
      description?: string;
      likes?: number;
}