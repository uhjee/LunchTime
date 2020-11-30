class SimpleImage {
  // ------------------------- getter ------------------------------
  // Toolbox에서 동작하도록 설정(toolbox에서의 제목과 icon의 getter 설정)
  static get toolbox() {
    return {
      title: "Image",
      icon:
        '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
    };
  }

  // ------------------------- consturctor ------------------------------
  // 이전의 데이터를 생성자의 파라미터에 'data'라는 객체를 갖고 rendering 된다.
  constructor({ data }) {
    this.data = data;
    this.wrapper = {};
  }

  // ------------------------- method ------------------------------
  // Block Tool이 되기 위해서는 최소한 아래 두개의 메소드를 가져야한다.
  // 01. render - DOM에 나타내는 메소드
  render() {
    // CSS 를 위한 wrapper element 만들기
    this.wrapper = document.createElement("div");
    const input = document.createElement("input");

    this.wrapper.classList.add("simple-image");
    this.wrapper.appendChild(input);

    // 이전 data 가 있다면, 해당 data로 출력
    if (this.data && this.data.url) {
      this._createImage(this.data.url, this.data.caption);
      return this.wrapper;
    }

    input.placeholder = "Paste an image URL...";
    input.value = this.data && this.data.url ? this.data.url : "";

    input.addEventListener("paste", (event) => {
      this._createImage(event.clipboardData.getData("text"));
    });

    return this.wrapper;
  }
  // 이미지와 캡션 엘레먼트를 보여주는 메소드
  _createImage(url, captionText) {
    const image = document.createElement("img");
    const caption = document.createElement("input");

    image.src = url;
    caption.placeholder = "Caption . . .";
    caption.value = captionText || "";

    this.wrapper.innerHTML = "";
    this.wrapper.appendChild(image);
    this.wrapper.appendChild(caption);
  }

  // 02. save - Block 의 data를 UI로부터 추출하는 메소드
  // 파라미터로 render 함수로 만들어준 element 객체를 가져온다.
  save(blockContent) {
    console.log(blockContent);
    const image = blockContent.querySelector("img");
    const caption = blockContent.querySelector("input");
    return {
      url: image.src,
      caption: caption.value,
    };
  }

  // 03. validate
  validate(saveData) {
    if (!saveData.url.trim()) {
      return false;
    }
    return true;
  }
}
