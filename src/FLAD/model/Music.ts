export default class Music {
  private _id: string;
  private _title: string;
  private _bio: string;
  private _image: string;
  private _trackPreviewUrl: string;

  constructor(id: string, title: string, bio: string, image: string, trackPreviewUrl: string) {
    this._title = title;
    this._bio = bio;
    this._image = image;
    this._id = id;
    this._trackPreviewUrl = trackPreviewUrl;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get bio(): string {
    return this._bio;
  }

  set bio(value: string) {
    this._bio = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get trackPreviewUrl(): string {
    return this._trackPreviewUrl;
  }

  set trackPreviewUrl(value: string) {
    this._trackPreviewUrl = value;
  }
}
