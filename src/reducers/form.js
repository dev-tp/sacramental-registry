import { CLOSE_FORM, OPEN_FORM, OPEN_FORM_WITH_DATA } from '../constants';

const initialState = {
  data: {
    id: 0,
    first_name: '',
    last_name: '',
    sex: '',
    birthday: '',
    birth_city: '',
    home_address_line_1: '',
    home_address_line_2: '',
    city: '',
    province: '',
    postal_code: '',
    father: '',
    mother: '',
    comments: '',
    baptism_date: '',
    baptism_church: '',
    baptism_presider: '',
    baptism_godfather: '',
    baptism_proxy_godfather: '',
    baptism_godmother: '',
    baptism_proxy_godmother: '',
    baptism_christian_witness: '',
    baptism_volume: '',
    baptism_page: '',
    baptism_line: '',
    communion_date: '',
    communion_church: '',
    communion_presider: '',
    communion_volume: '',
    communion_page: '',
    communion_line: '',
    confirmation_date: '',
    confirmation_church: '',
    confirmation_presider: '',
    confirmation_name: '',
    confirmation_sponsor: '',
    confirmation_volume: '',
    confirmation_page: '',
    confirmation_line: '',
    wedding_date: '',
    wedding_church: '',
    wedding_presider: '',
    wedding_witness_1: '',
    wedding_witness_2: '',
    wedding_partner_first_name: '',
    wedding_partner_last_name: '',
    wedding_partner_father: '',
    wedding_partner_mother: '',
    wedding_partner_home_address_line_1: '',
    wedding_partner_home_address_line_2: '',
    wedding_partner_city: '',
    wedding_partner_province: '',
    wedding_partner_postal_code: '',
    wedding_partner_baptism_date: '',
    wedding_partner_baptism_church: '',
    wedding_volume: '',
    wedding_page: '',
    wedding_line: '',
    profession_of_faith_date: '',
    profession_of_faith_church: '',
    profession_of_faith_presider: '',
    profession_of_faith_sponsor_1: '',
    profession_of_faith_sponsor_2: '',
    profession_of_faith_volume: '',
    profession_of_faith_page: '',
    profession_of_faith_line: '',
  },
  isOpen: false,
};

export default function form(state = initialState, action) {
  switch (action.type) {
    case CLOSE_FORM:
      return initialState;
    case OPEN_FORM:
      return { ...state, isOpen: true };
    case OPEN_FORM_WITH_DATA:
      return { ...state, isOpen: true, data: action.data };
    default:
      return state;
  }
}
