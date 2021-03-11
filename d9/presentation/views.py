from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def growers(request):
    return render(request,"presentation-growers.html",{})

def engineering(request):
    return render(request,"presentation-engineering.html",{})

def technology(request):
    return render(request,"presentation-technology.html",{})

def home(request):
    return render(request,"presentation-index.html",{})

def page_thermals(request):
    return render(request,"presentation-page-thermals.html",{})

def page_spectrum(request):
    return render(request,"presentation-page-spectrum.html",{})

def black(request):
    return render(request,"presentation-blk.html",{})
