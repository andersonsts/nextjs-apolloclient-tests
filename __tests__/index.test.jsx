import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing"
import { GET_EXCHANGE_RATES, App } from '../pages/index'

const mocks = [
	{
		request: {
			query: GET_EXCHANGE_RATES
		},
		result: {
			data: { rates: [{ currency: 'USD', rate: '3.765' }] }
		}
	}
]

it('render without errors!', () => {
	render(
		<MockedProvider mocks={[]} addTypename={false}>
			<App />
		</MockedProvider>
	)
		
	expect(screen.getByText("Loading...")).toBeInTheDocument()
})

it('render success status!', async () => {
	render(
		<MockedProvider mocks={mocks} addTypename={false}>
			<App />
		</MockedProvider>
	)

	await waitFor(() => new Promise(resolve => setTimeout(resolve, 0)))

	expect(screen.getByText("USD: 3.765"))
	.toBeInTheDocument()
})

it('should show error Network UI', async () => {
	const rateMock = [{
		request: {
			query: GET_EXCHANGE_RATES
		},
		error: new Error('An error occurred')
	}]

	render(
		<MockedProvider mocks={rateMock} addTypename={false}>
		  <App />
		</MockedProvider>,
	  );
	
	await waitFor(() => 
		new Promise(resolve => setTimeout(resolve, 0)) // wait for response
	)

	expect(screen.getByText("An error occurred"))
	.toBeInTheDocument()
})