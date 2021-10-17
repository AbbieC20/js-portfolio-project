# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'date'

calendar_a = Calendar.create(name: "Abbie's Test Holiday", start_date: Date.new(2021,11,01), end_date: Date.new(2021,11,05))

plan_a = Plan.create(name: "Breakfast", duration: 30, notes: "Cereal", start_time: DateTime.new(2021,11,01,9,30), calendar: calendar_a)
plan_b = Plan.create(name: "Shopping", duration: 90, notes: "Supplies", start_time: DateTime.new(2021,11,01,13,30), calendar: calendar_a)


