from django.shortcuts import render,redirect

# Create your views here.
def home(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return redirect('home_mobile')
    else:
        return render(request,"presentation-index.html",{})

def home_2d(request):
    return render(request,"presentation-index-2d.html",{})

def benefits(request):
    return render(request,"presentation-benefits.html",{})

def spectrum(request):
    return render(request,"presentation-spectrum.html",{})


def home_mobile(request):
    return render(request,"presentation-index-mobi.html",{})\


