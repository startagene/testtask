import React from "react";

const ErrorContext = React.createContext({
    showError: ({ message  }: { message: string }) => {}
});

export default ErrorContext