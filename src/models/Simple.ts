interface Simple {
  name: string;
}

class Simple implements Simple {
  name: string;

  constructor(name: string) {
    this.name = name;
    return { ...this };
  }
}

export default Simple;
