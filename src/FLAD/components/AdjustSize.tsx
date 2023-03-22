export default function AdjustSize(Text: string) {
    const titleLength = Text.length;
    const minFontSize = 23;
    const maxFontSize = 48;
    const fontRatio = 1.1;
    const fontSize = Math.max(minFontSize, maxFontSize - (titleLength * fontRatio));
    return fontSize;
}