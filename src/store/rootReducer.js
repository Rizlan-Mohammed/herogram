import { combineReducers } from 'redux'
import theme from './slices/themeSlice'
import auth from './slices/authSlice'
import vehicleSpecification from './slices/vehicleSpecificationSlice'

const rootReducer = (asyncReducers) => (state, action) => {
    const combinedReducer = combineReducers({
        theme,
        auth,
        vehicleSpecification,
        ...asyncReducers,
    })
    return combinedReducer(state, action)
}
  
export default rootReducer
