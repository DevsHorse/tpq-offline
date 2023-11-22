import {render, screen} from "@testing-library/react";
import StoragesPage from "./StoragesPage";
import {StoreProvider} from "../../../app/providers/StoreProvider";
import {BrowserRouter} from "react-router-dom";


describe('Storages page', () => {
  const Page = () => (
    <BrowserRouter>
      <StoreProvider>
        <StoragesPage />
      </StoreProvider>
    </BrowserRouter>
  );

  test('Storages Page opens', () => {
    render(<Page />)
    expect(screen.getByTestId('StoragesPage')).toBeInTheDocument();
  })
})