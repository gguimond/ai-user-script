//@ts-expect-error ssdffdgfg gfdgk fgknfg
import urlPositive from "./img/positive.png";
//@ts-expect-error ssdffdgfg gfdgk fgknfg
import urlNegative from "./img/negative.png";
//@ts-expect-error ssdffdgfg gfdgk fgknfg
import urlNeutral from "./img/neutral.png";

function $<T extends HTMLElement>(selector: string): T {
  return document.querySelector(selector) as T;
}

const run = async () => {
  /*  const { pipeline } = await import(
    "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.2.4"
  );
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pipeline: any = {};
  const pipe = await pipeline(
    "sentiment-analysis",
    "Xenova/distilroberta-finetuned-financial-news-sentiment-analysis"
  );

  const observer = new MutationObserver(() => {
    main();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  const main = async () => {
    const elem = $(".infinite-scroll-component");
    if (elem) {
      const posts = elem.querySelectorAll(
        "article div.relative div.whitespace-pre-wrap"
      );
      if (posts.length === 0) {
        return;
      }
      observer.disconnect();
      for (const p of posts) {
        const out = await pipe((p as HTMLElement).innerText);
        const label = out[0].label;
        let url = urlNeutral;
        switch (label) {
          case "positive":
            url = urlPositive;
            break;
          case "negative":
            url = urlNegative;
            break;
          default:
            break;
        }
        const oImg = document.createElement("img");
        oImg.setAttribute("src", url);
        oImg.setAttribute("height", "100px");
        oImg.setAttribute("width", "100px");
        p.appendChild(oImg);
      }
    }
  };
};
run();
