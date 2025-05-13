import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function createdAt() {
  return dayjs().format("YYYY-MM-DDTHH:mm:ss");
}

function timeAgo(dateString) {
  return dayjs(dateString).fromNow();
}

export { createdAt, timeAgo };
