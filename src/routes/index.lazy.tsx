import "../index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
	"https://byurjpsksirlrnzmwdsk.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5dXJqcHNrc2lybHJuem13ZHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2MzIzMzMsImV4cCI6MjAzMjIwODMzM30.8iilBElfDycOsQnRMC-HD-pLWLil6DSAwbmF17kVcuk",
);

export default function App() {
	const [session, setSession] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, []);

	if (!session) {
		return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
	} else {
		return <div>Logged in!</div>;
	}
}
