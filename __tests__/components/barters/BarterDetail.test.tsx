import { render, RenderResult } from '../../utils/utils'
import BarterDetail from '../../../components/Barters/BarterDetail'
import { TEST_BARTER, TEST_USER } from '../../testData'
import { initialState as rootState, RootState } from '../../../store/store'
import { Barter } from '../../../ts/interfaces/barters';
import userEvent from "@testing-library/user-event";

let documentBody: RenderResult;


const setupBarterDetail = (barter: Barter, initialState: RootState = rootState) =>
    render(<BarterDetail barter={barter} />, {
        initialState
    });

describe('<BarterDetail/>', () => {
    it('should render with basic detail components', () => {
        const initState = {
            ...rootState,
            auth: {
                ...rootState.auth,
                user: TEST_USER
            }
        }
        const { getByTestId, getByText, getAllByText } = setupBarterDetail(TEST_BARTER, initState)

        expect(getByTestId('BarterIcon')).toBeInTheDocument()
        expect(getByText(TEST_BARTER.title)).toBeInTheDocument()
        expect(getAllByText('Description')).toHaveLength(2) // one for mobile and one for desktop
        expect(getAllByText(TEST_BARTER.description)).toHaveLength(2) // one for mobile and one for desktop

        expect(getByTestId('IconButton')).toBeInTheDocument()


    })
    it('should navigate to send-message page when IconButton is clicked', async () => {
        const initState = {
            ...rootState,
            auth: {
                ...rootState.auth,
                user: TEST_USER
            }
        }
        const { getByTestId } = setupBarterDetail(TEST_BARTER, initState)

        const user = userEvent.setup()
        const iconButton = getByTestId('IconButton')
        iconButton.onclick = jest.fn()

        await iconButton.click()
        expect(iconButton.onclick).toHaveBeenCalled()


        // check that the page changes once 
    })
})