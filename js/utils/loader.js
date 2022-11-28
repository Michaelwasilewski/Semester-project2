function addLoader(elem) {
  const loader = `
     <div id="loader" class="flex justify-center mt-6">
       <svg class="rounded-full border-4 border-gray-200 border-t-gray-700 animate-spin h-8 w-8 mr-6 ..." viewBox="0 0 24 24"></svg>     
     </div>`;
  elem.parentElement.insertAdjacentHTML('beforeend', loader);
}

function removeLoader() {
  document.querySelector('#loader').remove();
}

export { addLoader, removeLoader };
