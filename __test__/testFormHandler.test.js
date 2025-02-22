/**
 * @jest-environment jsdom
 */


import { addDestination, handleSubmit } from '../src/client/js/formHandler.js';

describe('FormHandler Tests', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="destinations-container"></div>
            <button id="add-destination"></button>
            <form id="trip-form"></form>
            <section id="result"></section>
        `;

        document.getElementById('add-destination').addEventListener('click', addDestination);
    });

    test('addDestination adds a new destination div', () => {
        const container = document.getElementById('destinations-container');
        expect(container.children.length).toBe(0);

        addDestination();
        expect(container.children.length).toBe(1);

        const destination = container.querySelector('.destination');
        expect(destination).not.toBeNull();
    });

    test('handleSubmit shows error if no destinations', async () => {
        const resultContainer = document.getElementById('result');

        const fakeEvent = { preventDefault: jest.fn() };
        await handleSubmit(fakeEvent);

        expect(resultContainer.innerHTML).toContain('No destinations added');
    });

    test('handleSubmit shows error if city or date is missing', async () => {
        const container = document.getElementById('destinations-container');
        container.innerHTML = `
            <div class="destination">
                <input type="text" class="city" value="Paris" />
                <input type="date" class="date" value="" />
            </div>
        `;

        const resultContainer = document.getElementById('result');

        const fakeEvent = { preventDefault: jest.fn() };
        await handleSubmit(fakeEvent);

        expect(resultContainer.innerHTML).toContain('Please fill in both city and date');
    });
});
