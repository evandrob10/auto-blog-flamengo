export class CreateConfigDto {
  webConfigID?: number;
  typeAwaitLoad: string;
  selectAwaitLoad?: string;
  selectorPosts: string;
  selectorTitle: string;
  selectorContent: string;
  selectorDateTime: string | null;
  websiteID: number;
}
