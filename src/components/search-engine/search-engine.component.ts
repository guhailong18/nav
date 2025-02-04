import { Component, OnInit } from '@angular/core'
import { SEARCH_ENGINE_LIST } from '../../../config'
import { getDefaultSearchEngine, setDefaultSearchEngine } from '../../utils'

@Component({
  selector: 'app-search-engine',
  templateUrl: './search-engine.component.html',
  styleUrls: ['./search-engine.component.scss']
})
export class SearchEngineComponent implements OnInit {
  SEARCH_ENGINE_LIST = SEARCH_ENGINE_LIST

  currentEngine = getDefaultSearchEngine()

  showEngine = false

  keyword = ''

  constructor() { }

  ngOnInit(): void {
  }

  inputFocus() {
    const inputEl = document.getElementById('search-engine-input')
    if (inputEl) {
      inputEl.focus()
    }
  }

  ngAfterViewInit() {
    this.inputFocus()

    document.addEventListener('click', () => {
      this.toggleEngine(null, false)
    })
  }

  toggleEngine(e?: Event, isShow?: boolean) {
    if (e) {
      e.stopPropagation()
    }
    this.showEngine = typeof isShow === 'undefined'
      ? !this.showEngine
      : isShow
  }

  clickEngineItem(index) {
    this.currentEngine = SEARCH_ENGINE_LIST[index]
    this.toggleEngine()
    this.inputFocus()
    setDefaultSearchEngine(this.currentEngine)
  }

  onSearch() {
    window.open(this.currentEngine.url + this.keyword)
  }

  onKey(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.onSearch()
    }
  }
}
