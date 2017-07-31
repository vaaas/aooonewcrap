// jshint asi: true
// jshint esversion: 6
function main() {
"use strict"

let DATA = {}

function $(q) { return document.querySelector(q) }
function $$(q) { return document.querySelectorAll(q) }

function foreach (arr, fn) {
	for (let i = 0; i < arr.length; i++) fn(arr[i], i, arr)
}

function some (arr, fn) {
	for (let i = 0; i < arr.length; i++) {
		if (fn(arr[i], i, arr)) return true
	}
	return false
}

function map (arr, fn) {
	const ret = []
	foreach(arr, (item, i, arr) => { ret.push(fn(item, i, arr)) })
	return ret
}

function first_page_p (query) {
	if (query.search(/page=[^&]+&/) === -1) return true
	else if (query.search(/page=1&/) !== -1) return true
	else return false
}

function init_data() {
	const string = window.localStorage.getItem("aooonewcrap")
	return string ? JSON.parse(string) : {}
}

function searchpath() { return window.location.pathname + window.location.search }

function get_works() { return $$("h4.heading > a:first-of-type") }

function strip_page(string) {
	return string.replace(/page=[^&]+&/, "")
}

function highlight_new() {
	const search = strip_page(searchpath())
	if (search in DATA) {
		const set = new Set(DATA[search])
		some(get_works(), work => {
			if (set.has(work.href)) return true
			else {
				highlight(work)
				return false
			}
		})
	} else {
		foreach(get_works(), work => { highlight(work) })
	}
}

function highlight(elem) {
	elem.style = "background: #aa0000; padding: 0.25em; color: white"
}

function update_cache() {
	const search = strip_page(searchpath())
	DATA[search] = map(get_works(), work => { return work.href })
	window.localStorage.setItem("aooonewcrap", JSON.stringify(DATA))
}

function main() {
	if (window.location.pathname === "/works/search") {
		DATA = init_data()
		highlight_new()
		if (first_page_p(window.location.search))
			update_cache()
	}
}

main()

}

window.addEventListener("load", main)
