(function() {
  const self = document.currentScript;
  const siteId = self.getAttribute("data-site-id");
  const contentId = self.getAttribute("data-content-id");

  const iframeResizer = document.createElement('script');
  iframeResizer.async = true;
  iframeResizer.crossOrigin = 'anonymous';
  iframeResizer.src = 'https://cdn.jsdelivr.net/npm/iframe-resizer@4.3.6/js/iframeResizer.min.js'

  iframeResizer.onload = function() {
    const iframe = document.createElement('iframe');

    iframe.id = 'supacus'
    iframe.src = `https://supacus.offwork.kr/sites/${siteId}/contents/${contentId}`
    iframe.onload = function() {
      iframeResizer({}, '#supacus')
    }
  };

  self.parentElement.appendChild(iframeResizer);
})();