

const ConfirmModal = ({setShowConfirm, handleDelete, noteToDelete}) => {

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
         <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Delete this note?</h2>
            <p className="text-sm text-gray-600 mb-6">
               This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
               <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
               >
                  Cancel
               </button>
               <button
                  onClick={() => handleDelete(noteToDelete.blob_url, noteToDelete.id)}
                  className="px-4 py-2 text-sm font-medium rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:opacity-90 transition cursor-pointer"
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   )
}

export default ConfirmModal