import CreateFail from '../../components/Create/CreateFail'

function mockSetter(mockValue: string | null): void {}

function CreateFailTest(): JSX.Element {
  return <CreateFail setResStatus={mockSetter}/>
}

export default CreateFailTest
