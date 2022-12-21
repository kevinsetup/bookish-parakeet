import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Modals = ({ url , setIsOpen}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [renderNavButtons, setRenderNavButtons] = useState(false);

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }
  const previousPage = () => { changePage(-1); }
  const nextPage = () => { changePage(+1); }
  
  return (
    <>
   
      <div class="card" >
      <button className='btn btn-danger' onClick={() => setIsOpen(false)}>cerrar</button>
      {
            renderNavButtons &&
            <div className='flex'>
              <button className='btn btn-primary' onClick={previousPage}>Anterior</button>
              <button className = 'btn btn-success' onClick={nextPage}>Next</button>
            </div>

          }
        <div class="card-body">
          <Document
            file={{ url: url }}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setRenderNavButtons(true);
            
            }}
          
            
          >

            <Page pageNumber={pageNumber} />

              
          </Document>

         
        </div>
      </div>
    </>
  )

}

export default Modals