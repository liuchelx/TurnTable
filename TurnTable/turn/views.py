from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect,JsonResponse
from django.template import loader
from .models import Prize
from .models import User
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
import random

# Create your views here.
def index(request):
    return render(request,'turnTable/index.html')

#save the user phone and return 
def draw(request):
    
    if request.method == 'POST':
        
        phoneNum = request.POST.get("phone", "")
        context ={
            'phoneNum':phoneNum
        }
        #print(context)
        #check if the user already exist,not exist: save new user; exist: go to draw page directly
        if not User.objects.filter(phone=phoneNum):
           
            new_user = User(phone=phoneNum, prizeWin=0,isDraw=False)
            new_user.save()
            return render(request, 'turnTable/draw.html',context)
        else:
            return render(request, 'turnTable/draw.html',context)

def rotate(request):
    userPhone = str(request.POST.get('userPhone',""))
    prize = random.randrange(7)
    # user = get_object_or_404(User, pk=userPhone) 为啥不好用
    user =User.objects.get(phone=userPhone)
    #check if the user already drawed
    if user.isDraw == False:
        prizeWin = Prize.objects.get(prize_id=prize)
         #check the quantity of remaining prize, if the quantity is zero, then set prize tp 7 which is not winning
        if prizeWin.quantity > 0:
            prizeWin.quantity-=1
        else:
            prize =6
        user.prizeWin = prize
        #user.isDraw =True #make sure one user can only draw once
        user.save() #save the user info
        prizeWin.save() #update the prize quantity change
        response = {'userPhone':userPhone,"prize":prize,"isDraw":'no','quantity':prizeWin.quantity,'name':prizeWin.name}
        return JsonResponse(response)   
    else:
        prize =6
        response = {'userPhone':userPhone,"prize":prize,"isDraw":'yes'}
        return JsonResponse(response)   

def exist(request):
    return render(request,'turnTable/exist.html')

def no_prize(request):
    return render(request,'turnTable/no_prize.html')



    

