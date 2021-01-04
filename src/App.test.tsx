import React from 'react';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

beforeEach(() => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    );
});

beforeAll(() => {
    window.scrollTo = jest.fn();
})

describe('App', () => {
    test('Waits for the news to be loaded', async () => {
        jest.setTimeout(30000);

        expect(screen.getByTestId('app-loader')).toBeInTheDocument();
        await waitForElementToBeRemoved(() => screen.queryByTestId('app-loader'), { timeout: 30000 });
        expect(screen.getByRole('list')).toBeInTheDocument();
    });

    test('Shows news details on click', async () => {
        const newsTitleEl = screen.getAllByText((content, element) => element!.className.includes('header'))[0];
        const newsTitleText = newsTitleEl.textContent as string;

        await act(async () => {
            userEvent.click(screen.getAllByRole('listitem')[0]);
        });

        const newsDetailsTitleEl = screen.getByText((content, element) => element!.className.includes('header'));
        const regexp = new RegExp(newsTitleText);
        expect(newsDetailsTitleEl).toHaveTextContent(regexp);

        const newsListBtn = screen.getByText(/news list/i);

        expect(screen.queryByRole('list')).not.toBeInTheDocument();
        expect(screen.getByText(/refresh/i)).toBeInTheDocument();
        expect(newsListBtn).toBeInTheDocument();
    });

    test('Back from news details to news list', async () => {
        await act(async () => {
            userEvent.click(screen.getByText(/news list/i));
        });

        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});
