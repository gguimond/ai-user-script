function $<T extends HTMLElement>(selector: string): T {
  return document.querySelector(selector) as T;
}

const run = () => {
  const observer = new MutationObserver(() => {
    const elem = $(".infinite-scroll-component");
    console.log("*********************************");
    if (elem) {
      console.log(elem);
      const posts = elem.querySelectorAll("article div.relative");
      console.log(posts);
      if (posts.length === 0) {
        return;
      }
      observer.disconnect();
      for (const p of posts) {
        console.log((p as HTMLElement).innerText);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};
run();
