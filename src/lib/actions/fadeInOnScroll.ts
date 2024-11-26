export function fadeInOnScroll(node: HTMLElement) {
  node.classList.add('hidden');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add('unhidden');
        } else {
          node.classList.remove('unhidden');
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    },
  };
} 