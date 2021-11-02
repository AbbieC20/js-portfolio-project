class CalendarsController < ApplicationController
    
    def create
        calendar = Calendar.create(name: create_calendar_params[:name], start_date: create_calendar_params[:startDate], end_date: create_calendar_params[:endDate])
        render json: calendar, only: [:name, :start_date, :end_date, :id]
    end

    def index
        calendars = Calendar.all
        render json: calendars, only: [:name, :start_date, :end_date, :id]
    end

    private

    def create_calendar_params
        params.permit(:name, :startDate, :endDate)
    end

end
