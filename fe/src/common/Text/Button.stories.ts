import type { StoryObj, Meta } from '@storybook/react';
//@storybook/react에서 제공하는 StoryObj와 Meta 타입을 import합니다.
import Button from './Button';
//버튼 컴포넌트를 import합니다.

const meta = {
  title: 'Common/Button',
  component: Button,
} satisfies Meta<typeof Button>;
// meta 변수에 객체를 할당하여 스토리의 메타 데이터를 정의합니다. title은 스토리의 제목을 나타내며, component는 해당 스토리에 사용될 컴포넌트를 지정합니다.
// satisfies 키워드를 사용하여 meta 객체가 Meta<typeof Button> 타입을 충족시킨다는 것을 명시합니다.

export default meta;
// export default meta;: meta 객체를 기본 내보내기로 설정합니다. 이를 통해 다른 파일에서 해당 메타 데이터를 import할 수 있게 됩니다.
type Story = StoryObj<typeof meta>;
//type Story = StoryObj<typeof meta>;: StoryObj 타입에 typeof meta를 할당하여 Story 타입을 정의합니다. Story 타입은 스토리 객체를 나타냅니다.

// ButtonStory의 이름은 변경해도 된다
export const ButtonStory: Story = {
  args: {
    title: 'click me',
    color: 'blue',
  },
};
//export const Primary: Story = { ... }: Primary라는 스토리를 정의합니다.
// Story 타입을 지정하여 해당 스토리 객체의 타입을 설정합니다. args 속성을 사용하여 버튼 컴포넌트에 전달할 초기 속성 값을 지정할 수 있습니다.
