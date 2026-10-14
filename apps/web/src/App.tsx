import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import { LoanApplicationPage } from "./modules/LoanApplicationPage";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoanApplicationPage />
    </QueryClientProvider>
  );
}
