import React from 'react'

export default function E404() {
  return (
    <div>
       <div class="container text-center">
          <div class="row my-5">
            <div class="col-md-12 my-5">
              <h1 class="display-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="red" className="bi bi-exclamation-triangle-fill mx-2" viewBox="0 0 16 16">
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                404</h1>
              <h2>Page Not Found</h2>
              <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
              <a href="/" class="btn btn-primary">Back to Home</a>
            </div>
          </div>
        </div>
    </div>
  )
}
