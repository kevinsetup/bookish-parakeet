import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
import Modals from './Modals';
function App() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [data, setData] = useState(null);


  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getData()

  }, []);
  useEffect(() => {
    if (!isOpen) {
      getData()
    }
  }, [isOpen]);
  const getData = () => {
    fetch("https://63a2af21ba35b96522fbcbc4.mockapi.io/api/v1/documents", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setData(data);
      })
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const openModal = (id) => {
    console.log(id)
    setIsOpen(true)
    const datas = data.filter((item) => item.id_document === id)
    console.log(datas[0].url)
    setData(datas)







  }
  console.log(isOpen)
  if (isOpen) {

    return (
      <Modals url={data[0].url} setIsOpen={setIsOpen} />
    )
  }


  return (
    <div>
      <h1>Mis documentos</h1>



      <div className='d-flex flex-row mt-3'>



        {
          data && data.map((item, i) => (
            <div className="col  mb-2">
              <div class="card h-100" key={i} >

                <div class="card-body">
                  <p>Documento número {i + 1}</p>
                  <h5 class="card-title">{item.name}</h5>
                  <p class="card-text">{item.description}</p>
                  <a href="#" class="btn btn-primary" onClick={() => openModal(item.id_document)}>Ver Documento</a>
                </div>





              </div>
            </div>
          ))
        }
      </div>














    </div>
  );
}
export default App;