export class Music {
  private _name: string;
  private _bio: string;
  private _image: ImageSource;

  constructor(title: string, bio: string, image: any) {
    this._title = name;
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
    return this._latitude;
  }

  set bio(value: string) {
    this._latitude = value;
  }

  get image(): any {
    return this._image;
  }

  set image(value: any) {
    this._image = value;
  }
}
