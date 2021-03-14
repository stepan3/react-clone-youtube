import React, { useState } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { Menu, Item, Icon, Form, Input } from 'semantic-ui-react'
import { params } from '../../store/types'
import { getParamValue } from '../../utils/uri'

import './TopNav.css'

interface ITopNav extends RouteComponentProps<params> {}

const TopNav = (props: ITopNav) => {
  const [searchInputState, setSearchState] = useState(
    getParamValue(props.location, 'search_query') || ''
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string = e.currentTarget.value
    setSearchState(() => value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const encodeUri = encodeURI(searchInputState!)
    props.history.push(`/result?search_query=${encodeUri}`)
  }

  return (
    <Menu borderless fixed="top" className="top_nav">
      <Item>
        <span>
          <Icon size="large" name="youtube" />
        </span>
        <span>UTube</span>
      </Item>
      <Menu.Menu className="top_nav_container">
        <Item className="search_input">
          <Form onSubmit={onSubmit}>
            <Form.Field>
              <Input
                placeholder="Search"
                value={searchInputState}
                action={{ icon: 'search' }}
                onChange={onSearchChange}
              />
            </Form.Field>
          </Form>
        </Item>
      </Menu.Menu>
      <Menu.Menu>
        <Item>
          <Icon className="menu_icon" name="video" size="large" />
        </Item>
        <Item>
          <Icon className="menu_icon" name="grid layout" size="large" />
        </Item>
        <Item>
          <Icon className="menu_icon" name="ellipsis vertical" size="large" />
        </Item>
      </Menu.Menu>
    </Menu>
  )
}

export default withRouter(TopNav)
