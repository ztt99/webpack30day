const css = [];

const loader = function(sourceCode) {
  css.push(sourceCode);
};

class MiniCssExtractPlugin {
  apply() {
    const code = css.join("\n");
    this.emitFile("main.css", code);
  }
  static loader = loader;
}

export default MiniCssExtractPlugin;
