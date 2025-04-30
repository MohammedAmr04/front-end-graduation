import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function createdAt() {
  return dayjs().format("YYYY-MM-DDTHH:mm:ss");
}

function timeAgo(dateString) {
  return dayjs(dateString).fromNow();
}

function cleanAndSplitText(rawText, charsPerPage = 400) {
  let cleanedText = rawText;

  if (cleanedText.startsWith("b'") || cleanedText.startsWith('b"')) {
    cleanedText = cleanedText.slice(2, -1);
  }

  cleanedText = cleanedText.replace(/\\r\\n/g, "\n");
  cleanedText = cleanedText.replace(/\\n/g, "\n");
  cleanedText = cleanedText.replace(/\\'/g, "'");
  cleanedText = cleanedText.replace(/\\"/g, '"');
  cleanedText = cleanedText.replace(/\\\\/g, "\\");

  try {
    cleanedText = decodeURIComponent(escape(cleanedText));
  } catch (e) {
    console.warn(e || "Error decoding text, continuing with cleaned text.");
  }

  const pages = [];
  for (let i = 0; i < cleanedText.length; i += charsPerPage * 2) {
    // نقسم كل مرة بناءً على صفحتين
    const frontText = cleanedText.slice(i, i + charsPerPage) || "";
    const backText =
      cleanedText.slice(i + charsPerPage, i + 2 * charsPerPage) || "";
    pages.push({
      front: frontText || "End of content",
      back: backText || "End of content",
    });
  }

  return pages;
}
export { createdAt, timeAgo, cleanAndSplitText };
