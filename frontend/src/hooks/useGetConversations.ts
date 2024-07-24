import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState<ConversationType[]>([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await fetch("http://localhost:3000/api/messages/conversations",{
					credentials:'include'
				});
				const data = await res.json();
				console.log(data)
				if (data.error) {
					throw new Error(data.error);
				}
				setConversations(data);
			} catch (error: any) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading, conversations };
};
export default useGetConversations;