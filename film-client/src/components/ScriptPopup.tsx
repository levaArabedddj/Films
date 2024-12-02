import { useState } from "react"
import FormContainer from "./FormContainer"
import FormInput from "./FormInput"
import Popup from "./Popup"
import SubmitButton from "./SubmitButton"
import { useParams } from "react-router-dom"
import scriptService from "../services/script-service"
import { ScriptCreate } from "../types/response/films"

const ScriptPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({isOpen, onClose}) => {
    const {id} = useParams()
    const [script, setScript] = useState('')
    const handleSubmit = () => {
		if (!id) throw new Error("Project ID not found");

		const scriptData: ScriptCreate = {content: script};

		scriptService
			.create(scriptData, +id)
			.then(() => {
				window.location.reload();
			})
			.catch(error => {
				console.error("Failed to create finance entry:", error);
			});

		onClose();
    }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
    <h3 className="text-xl font-semibold mb-4">Add script</h3>
    <FormContainer title="" handleSubmit={handleSubmit}>
        <textarea 
        name="script" 
        id="script"
        value={script}
        onChange={(e) => setScript(e.target.value)}
        required
        className="mb-2 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
        />
        <SubmitButton label="Create script" />
    </FormContainer>
</Popup>
    
  )
}

export default ScriptPopup