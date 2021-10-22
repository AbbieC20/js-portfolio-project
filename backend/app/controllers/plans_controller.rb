require 'date'

class PlansController < ApplicationController

    def create
        calendar = Calendar.find_by(id: create_plan_params[:calendarId])
        plan = Plan.create(name: create_plan_params[:name], date: create_plan_params[:planDate], start_time: create_plan_params[:startTime], duration: create_plan_params[:duration],  notes: create_plan_params[:notes], calendar: calendar)
        render json: plan, only: [:name, :date, :start_time, :duration, :notes, :id] 
    end

    private

    def create_plan_params
        params.permit(:name, :planDate, :startTime, :duration, :notes, :calendarId)
    end

end