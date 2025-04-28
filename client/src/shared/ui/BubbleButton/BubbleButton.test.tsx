import {render} from "@testing-library/react";
import BubbleButton from "shared/ui/BubbleButton/BubbleButton";
import {userEvent} from "@storybook/testing-library";
import {$api} from "shared/config/api/api";
import MockAdapter from "axios-mock-adapter"

describe('bubble button tests', () => {
    let axiosMockAdapter: MockAdapter

    beforeAll(() => {
        axiosMockAdapter = new MockAdapter($api)
    })

    afterEach(() => {
        axiosMockAdapter.restore()
    })

    it('should execute callback on click', function () {
        const mock = jest.fn()
        const container = render(<BubbleButton
            onClick={mock}
        >
            testId
        </BubbleButton>)
        const element = container.getByText('testId')
        userEvent.click(element)
        expect(mock).toHaveBeenCalled()
        expect(mock).toHaveBeenCalledTimes(1)
    });

    it('should mock axios request', function () {
        const data = {}
        axiosMockAdapter.onGet('fake-url').reply(200, data)
        const mock = jest.fn(async () => {
            const response = await $api.get('fake-url')
            expect(response.data).toEqual(data)
        })
        const container = render(<BubbleButton
            onClick={mock}
        >
            testId
        </BubbleButton>)
        userEvent.click(container.getByText('testId'))
        expect(mock).toHaveBeenCalled()
        expect.assertions(2)
    });

})