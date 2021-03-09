import React, { useState } from 'react'
import { Menu, Item, Icon, Form, Input } from 'semantic-ui-react'

import './TopNav.css'

export const TopNav = () => {
  const [searchInput, setSearchInput] = useState('')

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string = e.currentTarget.value
    setSearchInput(() => value)
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
          <Form>
            <Form.Field>
              <Input
                placeholder="Search"
                value={searchInput}
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
