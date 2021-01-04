import React from 'react'
import { Loader } from 'semantic-ui-react'

const AppLoader: React.FC = () => (
    <Loader active inverted size='large' data-testid='app-loader' />
);

export default AppLoader