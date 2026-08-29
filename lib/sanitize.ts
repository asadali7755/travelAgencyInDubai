import createDOMPurify from "dompurify";
import { JSDOM } from "jsdom";

const DOMPurify = createDOMPurify(new JSDOM("").window as unknown as Window & typeof globalThis);

export const sanitizeHtml = (dirty: string) =>
  DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "p", "br", "strong", "em", "ul", "ol", "li",
      "h2", "h3", "h4", "blockquote", "a", "img", "code", "pre",
    ],
    ALLOWED_ATTR: ["href", "title", "alt", "src", "rel", "target"],
    ALLOWED_URI_REGEXP: /^(https?:|mailto:|\/)/i,
  });
