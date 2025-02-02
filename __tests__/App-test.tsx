import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '../App';
import * as SQLite from 'expo-sqlite';

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn().mockResolvedValue({
    execAsync: jest.fn().mockResolvedValue(''),
    getAllAsync: jest.fn().mockResolvedValue([{ id: 1, name: 'this is a test' }]),
    runAsync: jest.fn().mockResolvedValue(''),
  }),
}));

describe('<App />', () => {
  it('should render the app', () => {
    const { getByText } = render(<App />);
    expect(getByText('Create db')).toBeDefined();
    expect(getByText('Delete db')).toBeDefined();
  });

  it('should create the database and insert a note', async () => {
    const { getByText } = render(<App />);
    const createDbButton = getByText('Create db');

    fireEvent.press(createDbButton);

    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async operations

    expect(SQLite.openDatabaseAsync).toHaveBeenCalledWith('database');
    // expect(SQLite.openDatabaseAsync().execAsync).toHaveBeenCalledWith(expect.stringContaining('CREATE TABLE IF NOT EXISTS notes'));
    // expect(SQLite.openDatabaseAsync().execAsync).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO notes (name) VALUES (\'this is a test\')'));
    // expect(SQLite.openDatabaseAsync().getAllAsync).toHaveBeenCalledWith('SELECT * FROM notes');
  });

  it('should delete the database', async () => {
    const { getByText } = render(<App />);
    const deleteDbButton = getByText('Delete db');

    fireEvent.press(deleteDbButton);

    await new Promise((resolve) => setTimeout(resolve, 0)); // wait for async operations

    expect(SQLite.openDatabaseAsync).toHaveBeenCalledWith('database');
    // expect(SQLite.openDatabaseAsync().runAsync).toHaveBeenCalledWith('DROP TABLE notes');
  });
});