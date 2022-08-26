import { render, RenderResult } from '../../utils'
import BarterDetail from '../../../components/Barters/BarterDetail'
import { INIT_STATE_AUTHENTICATED, TEST_BARTER, TEST_USER } from '../../testData'
import { initialState as rootState, RootState } from '../../../store/store'
import { Barter } from '../../../ts/interfaces/barters';
import userEvent from "@testing-library/user-event";
import setupElement from '../../utils/setupElement'

describe('<BarterDetail/>', () => {
    it('should render with basic detail components', () => {
        const { getByTestId, getByText, getAllByText } = setupElement(
            <BarterDetail barter={TEST_BARTER} />,
            INIT_STATE_AUTHENTICATED
        )

        expect(getByTestId('BarterIcon')).toBeInTheDocument()
        expect(getByText(TEST_BARTER.title)).toBeInTheDocument()
        expect(getAllByText('Description')).toHaveLength(2) // one for mobile and one for desktop
        expect(getAllByText(TEST_BARTER.description)).toHaveLength(2) // one for mobile and one for desktop

        expect(getByTestId('IconButton')).toBeInTheDocument()


    })
    it('should navigate to send-message page when IconButton is clicked', async () => {
        const { getByTestId } = setupElement(
            <BarterDetail barter={TEST_BARTER} />,
            INIT_STATE_AUTHENTICATED
        )

        const user = userEvent.setup()
        const iconButton = getByTestId('IconButton')
        iconButton.onclick = jest.fn()

        await iconButton.click()
        expect(iconButton.onclick).toHaveBeenCalled()


        // check that the page changes once 
    })
})