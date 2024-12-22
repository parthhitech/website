import * as pdfjsLib from '../pdfjs/pdf.mjs';
  
    const url = '../files/parthhitechprofile.pdf';
    pdfjsLib.GlobalWorkerOptions.workerSrc = '../pdfjs/pdf.worker.mjs';
  
    const pdfViewer = document.getElementById('pdf-viewer');
    let pdf = null;
    let scale = 1.5;  // Initial scale for high quality
  
    // Function to render a PDF page with consistent scaling
    function renderPage(pageNumber) {
      pdf.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        // Set the canvas dimensions based on device pixel density
        const devicePixelRatio = window.devicePixelRatio || 1;
        canvas.width = viewport.width * devicePixelRatio;
        canvas.height = viewport.height * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);
  
        pdfViewer.appendChild(canvas);
  
        page.render({
          canvasContext: context,
          viewport,
        });
      });
    }
  
    // Function to load all pages in the PDF
    function loadAllPages() {
      for (let i = 1; i <= pdf.numPages; i++) {
        renderPage(i);
      }
    }
  
    // Adjust PDF scaling based on viewport size for consistent page size
    function adjustPDFScale() {
      const defaultWidth = 800; // Base width for scaling
      const viewportWidth = pdfViewer.clientWidth;
  
      // Calculate scale based on viewport size
      scale = (viewportWidth / defaultWidth) * 1.5 * (window.devicePixelRatio || 1);
  
      // Clear current content and load all pages again for consistent size
      pdfViewer.innerHTML = '';
      loadAllPages();
    }
  
    // Load the PDF and set up resize event listener
    pdfjsLib.getDocument(url).promise.then(loadedPdf => {
      pdf = loadedPdf;
      adjustPDFScale();
    });
    
    window.addEventListener('resize', adjustPDFScale);