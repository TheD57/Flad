export default class Music {
  private _title: string;
  private _bio: string;
  private _image: ImageSource;

  constructor(title: string, bio: string, image: ImageSource) {
    this._title = title;
    this._bio = bio;
    this._image = image;
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

  get image(): ImageSource {
    return this._image;
  }

  set image(value: ImageSource) {
    this._image = value;
  }
}
